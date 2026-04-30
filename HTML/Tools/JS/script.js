// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // Base64工具功能
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const btnEncode = document.getElementById('btn-encode');
    const btnDecode = document.getElementById('btn-decode');
    const btnCopy = document.getElementById('btn-copy');
    const btnClear = document.getElementById('btn-clear');
    const inputCount = document.getElementById('input-count');
    const outputCount = document.getElementById('output-count');
    
    // 实时更新字符计数
    inputText.addEventListener('input', function() {
        inputCount.textContent = this.value.length;
    });
    
    outputText.addEventListener('input', function() {
        outputCount.textContent = this.value.length;
    });
    
    // 编码为Base64
    btnEncode.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) {
            showNotification('请输入需要加密的文本');
            return;
        }
        
        try {
            // 使用btoa进行Base64编码
            const encoded = btoa(unescape(encodeURIComponent(text)));
            outputText.value = encoded;
            outputCount.textContent = encoded.length;
        } catch (error) {
            showNotification('编码失败: ' + error.message);
        }
    });
    
    // 解码Base64
    btnDecode.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) {
            showNotification('请输入需要解密的Base64文本');
            return;
        }
        
        try {
            // 使用atob进行Base64解码
            const decoded = decodeURIComponent(escape(atob(text)));
            outputText.value = decoded;
            outputCount.textContent = decoded.length;
        } catch (error) {
            showNotification('解码失败: 请确保输入的是有效的Base64编码');
        }
    });
    
    // 复制结果
    btnCopy.addEventListener('click', function() {
        const text = outputText.value.trim();
        if (!text) {
            showNotification('没有可复制的内容');
            return;
        }
        
        // 使用现代API替代document.execCommand
        navigator.clipboard.writeText(text)
            .then(() => {
                showNotification('复制成功!', true);
            })
            .catch(err => {
                showNotification('复制失败: ' + err.message);
            });
    });
    
    // 清空
    btnClear.addEventListener('click', function() {
        inputText.value = '';
        outputText.value = '';
        inputCount.textContent = '0';
        outputCount.textContent = '0';
        inputText.focus();
    });
    
    // 工具切换功能
    const toolButtons = document.querySelectorAll('aside button');
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有工具按钮的活动状态
            toolButtons.forEach(btn => btn.classList.remove('tool-active'));
            // 添加当前按钮的活动状态
            this.classList.add('tool-active');
            
            // 这里可以添加工具切换逻辑
            const toolId = this.id;
            if (toolId === 'tool-base64') {
                // 显示Base64工具内容
                document.getElementById('base64-tool').style.display = 'block';
                // 可以添加其他工具的隐藏逻辑
            } else {
                // 隐藏Base64工具内容
                document.getElementById('base64-tool').style.display = 'none';
            }
        });
    });
    
    // 初始化显示第一个工具
    if (toolButtons.length > 0) {
        toolButtons[0].click();
    }
});

// 显示通知
function showNotification(message, isSuccess = false) {
    // 检查是否已存在toast元素
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        // 创建toast元素
        toast = document.createElement('div');
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    
    // 设置消息内容和样式
    toast.textContent = message;
    if (isSuccess) {
        toast.classList.add('bg-green-500');
        toast.classList.remove('bg-red-500');
    } else {
        toast.classList.add('bg-red-500');
        toast.classList.remove('bg-green-500');
    }
    
    // 显示toast
    toast.classList.add('show');
    
    // 3秒后隐藏toast
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
    