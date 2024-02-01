// 引入React的useState和useEffect钩子。
import { useState, useEffect } from 'react';

// 定义自定义钩子useFetch，它接受一个URL作为参数。
const useFetch = (url) => {
  // data: 用于存储从API获取的数据。
  const [data, setData] = useState(null);
  // isPending: 表示数据是否正在加载中。
  const [isPending, setIsPending] = useState(true);
  // error: 存储请求过程中可能出现的错误信息。
  const [error, setError] = useState(null);

  // 使用useEffect钩子处理网络请求和响应。
  useEffect(() => {
    // 创建一个AbortController实例，用于能够取消fetch请求。
    const abortCont = new AbortController();

    // 设置一个延时来模拟网络延迟。
    setTimeout(() => {
      // 发起fetch请求，传递abortCont的signal以便能够取消请求。
      fetch(url, { signal: abortCont.signal })
          .then(res => {
            if (!res.ok) { // 如果响应状态不是2xx, 抛出错误。
              throw Error('could not fetch the data for that resource');
            }
            return res.json(); // 解析响应为JSON。
          })
          .then(data => {
            // 请求成功，更新状态变量。
            setIsPending(false);
            setData(data);
            setError(null);
          })
          .catch(err => {
            if (err.name === 'AbortError') {
              // 如果请求被取消，打印消息但不更新状态。
              console.log('fetch aborted')
            } else {
              // 对于其他错误，停止加载并设置错误消息。
              setIsPending(false);
              setError(err.message);
            }
          })
    }, 1000);

    // 组件卸载时或URL改变时，中止fetch请求
    return () => abortCont.abort();
  }, [url]) // useEffect依赖于url，当url变化时重新运行。

  // 返回包含数据、加载状态和错误信息的对象。
  return { data, isPending, error };
}

// 导出useFetch钩子，使其可以在其他组件中使用。
export default useFetch;
