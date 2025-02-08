import { useState, useEffect } from 'react';

const useMediaQuery = (query: any) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addListener(handleChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

  // const isSmallScreen = useMediaQuery('(max-width: 960px)'); // 假设960px为小屏幕的阈值

  // console.log('isSmallScreen')
  // console.log(isSmallScreen)