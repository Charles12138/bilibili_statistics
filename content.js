// 等待页面加载完成
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error(`Element ${selector} not found after ${timeout}ms`));
      } else {
        setTimeout(checkElement, 100);
      }
    };
    
    checkElement();
  });
}

// 获取数据的主函数
async function getVideoData() {
  try {
    console.log('开始获取视频数据...');
    
    // 等待所有元素加载
    await Promise.all([
      waitForElement('h1.video-title'),
      waitForElement('.view-text'),
      waitForElement('.dm-text'),
      waitForElement('.video-like-info'),
      waitForElement('.video-coin-info'),
      waitForElement('.video-fav-info'),
      waitForElement('.video-share-info-text')
    ]);
    
    console.log('所有元素已加载');
    
    // 获取视频数据
    const videoData = {
      title: document.querySelector('h1.video-title')?.textContent?.trim() || '未知标题',
      views: document.querySelector('.view-text')?.textContent?.trim() || '0',
      danmaku: document.querySelector('.dm-text')?.textContent?.trim() || '0',
      likes: document.querySelector('.video-like-info')?.textContent?.trim() || '0',
      coins: document.querySelector('.video-coin-info')?.textContent?.trim() || '0',
      favorites: document.querySelector('.video-fav-info')?.textContent?.trim() || '0',
      reposts: document.querySelector('.video-share-info-text')?.textContent?.trim() || '0'
    };

    // 打印每个元素的值，帮助调试
    Object.entries(videoData).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });

    // 发送数据到popup
    chrome.runtime.sendMessage({ type: 'videoData', data: videoData });
  } catch (error) {
    console.error('获取视频数据时出错:', error);
    // 在出错时也发送消息，显示错误状态
    chrome.runtime.sendMessage({ 
      type: 'videoData', 
      data: {
        title: '加载失败',
        views: '0',
        danmaku: '0',
        likes: '0',
        coins: '0',
        favorites: '0',
        reposts: '0'
      }
    });
  }
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getVideoData') {
    console.log('收到获取数据请求');
    getVideoData();
  }
});

// 页面加载完成后执行
getVideoData();

// 监听URL变化（用于处理B站单页应用导航）
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    getVideoData();
  }
}).observe(document, { subtree: true, childList: true }); 