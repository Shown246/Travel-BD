import{ useState, useEffect, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { useTransition, a } from '@react-spring/web'
import shuffle from 'lodash.shuffle'

import useMedia from './useMedia'
import getRandomImages  from './data.js'

import styles from './styles.module.css'

const SimpleGallery = () =>{
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(['(min-width: 1024px)', '(min-width: 768px)', '(min-width: 640px)'], [3, 2, 1], 2)
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure()
  // Hook3: Hold items
  const [items, setItems] = useState([]);
  const [, set] = useState(items);
  const fetchAndSetImages = async () => {

    try {
      const newImages = await getRandomImages();
      setItems(newImages);
      set(shuffle)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  useEffect(() => {
    fetchAndSetImages();
    const t = setInterval(() => fetchAndSetImages(), 2500)
    return () => clearInterval(t)
  }, [])
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
    let gridItems = items.map((child) => {
      const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column // x = container width / number of columns * column index,
      const y = (heights[column] += child.height / 2) - child.height / 2 // y = it's just the height of the current column
      return { ...child, x, y, width: width / columns, height: child.height / 2 }
    })
    return [heights, gridItems]
  }, [columns, items, width])
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.css,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })
  // Render the grid
  return (
    <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.div style={style}>
          <div style={{ backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)` }} />
        </a.div>
      ))}
    </div>
  )
}

export default SimpleGallery;
