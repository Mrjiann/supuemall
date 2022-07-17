export function debounce(func, delay) {
    let timer = null;

    return function (...args) {
      if (timer) clearTimeout(timer);
      // 永远放在最后执行setTimeout
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay)
    }
}