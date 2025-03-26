// 初始化popup内容
function initializePopup() {
  document.body.innerHTML = `
    <h1 style="color: #00a1d6; font-size: 18px; margin-bottom: 15px; text-align: center;">B站视频数据统计</h1>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">标题</th><td id="title" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">播放量</th><td id="views" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">弹幕数</th><td id="danmaku" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">点赞</th><td id="likes" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">投币</th><td id="coins" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">收藏</th><td id="favorites" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
      <tr><th style="color: #666; width: 80px; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">转发</th><td id="reposts" style="color: #333; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></td></tr>
    </table>
  `;
}

// 显示错误信息
function showError(message) {
  document.body.innerHTML = `
    <div style="
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 14px;
      font-family: 'Microsoft YaHei', sans-serif;
    ">
      ${message}
    </div>
  `;
}

// 检查是否为B站视频页面
function isBilibiliVideoPage(url) {
  try {
    // 创建URL对象以解析URL
    const urlObj = new URL(url);
    // 检查域名是否为bilibili.com
    if (!urlObj.hostname.endsWith('bilibili.com')) {
      return false;
    }
    // 检查路径是否以/video/开头，且后面有视频ID
    const pathParts = urlObj.pathname.split('/');
    return pathParts[1] === 'video' && pathParts[2] && pathParts[2].length > 0;
  } catch (e) {
    return false;
  }
}

// 当popup打开时，查询当前标签页
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  if (!tabs || tabs.length === 0) {
    showError('无法获取当前页面信息');
    return;
  }

  const currentTab = tabs[0];
  const url = currentTab.url || '';

  // 使用新的检查函数
  if (isBilibiliVideoPage(url)) {
    // 初始化popup内容
    initializePopup();
    // 向content script发送消息，请求数据
    chrome.tabs.sendMessage(currentTab.id, {type: 'getVideoData'});
  } else {
    showError('请在B站视频页面使用此插件');
  }
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'videoData') {
    const data = message.data;
    // 更新页面显示
    document.getElementById('title').textContent = data.title;
    document.getElementById('views').textContent = data.views;
    document.getElementById('danmaku').textContent = data.danmaku;
    document.getElementById('likes').textContent = data.likes;
    document.getElementById('coins').textContent = data.coins;
    document.getElementById('favorites').textContent = data.favorites;
    document.getElementById('reposts').textContent = data.reposts;
  }
}); 