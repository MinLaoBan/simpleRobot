$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 将用户输入的内容渲染到聊天窗口中
    $('#btnSend').on('click', function () {
        let text = $('#ipt').val().trim()
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        // 将填写的内容添加到内容区域
        $('.talk_list').append(`<li class="right_word">
            <img src="img/person02.png" /> <span>${text}</span>
          </li>`)
        $('#ipt').val('')

        //   定位滚动条
        resetui()
        getMsg(text)
    })

    // 发起请求获取聊天机器人的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // 如果信息返回成功将信息添加在内容区域
                if (res.message === 'success') {
                    let resText = res.data.info.text
                    $('.talk_list').append(`<li class="left_word">
                    <img src="img/person01.png" /> <span>${resText}</span>
                  </li>`)
                //   利用语音将对方返回来的数据播放出来
                    getVoice(resText)
                }

            }
        })
    }

    // 把文字转换为语音播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    $('#voice').prop('src', res.voiceUrl)
                }
            }
        })
        //   定位滚动条
        resetui()
    }

    // 利用回车键发送消息
    $('#ipt').on('keyup',function(e) {
        if(e.keyCode === 13) {
            $('#btnSend').click()
        }
    })
})