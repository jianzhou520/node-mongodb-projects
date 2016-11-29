(function () {
    if ( typeof tools == 'undefined' || tools == undefined ) {
        tools = {};
    }
    /**
     * 切换对应组件列表项的选中状态
     * @param selector {string} 用来定位到需要添加事件的选择器
     * @param toggleClass {toggleClass} 标志选中状态的css class
     */
    tools.attachToggle = function ( selector, toggleClass ) {
        var $targets = $(selector);
        $targets.on('click', function ( event ) {
            var $this = $(this);
            if ( !$this.hasClass( toggleClass ) ) {
                if ( !$this.next().hasClass('notshow') ) {
                    $targets.filter('.active').next().slideUp();
                }
                $targets.removeClass(toggleClass);
                $this.addClass(toggleClass);
            } else {
                return;
            }

            // 展开更多详情
            if ( $this.hasClass('more') && $this.next().hasClass('notshow') ) {
                $this.next().animate({
                    'height': 'toggle'
                });
            }
        });
    }

    /**
     * 页面的全选按钮的功能实现
     * @param selector {stirng} 监听全选操作元素的选择器
     *
     */
    tools.attachSelectAll = function ( selector ) {
        var $target = $(selector);
        $target.on('click', function ( event ) {
            // 如果是选中状态，则执行全不选操作
            if ( $target.filter(':checked').length == 0 ) {
                $target
                .parents('table')
                    .find('input[type="checkbox"]')
                    .each( function ( index, currElement ) {
                        currElement.checked = '';
                    });
            } else {
                $target
                .parents('table')
                    .find('input[type="checkbox"]')
                    .each( function ( index, currElement ) {
                        currElement.checked = 'checked';
                    });
            }
        });
    }

    /**
     * 目标元素的隐藏和显示
     * @param selector {string} 目标元素的选择器
     * @param toggleClass {string} 控制元素状态的类
     * @param content {string} 是否需要向内容中添加的文本内容
     * @param data {Array} 表示删除要进行操作的元素
     * @param config {Object} 表示删除请求的配置参数
     */
    tools.toggleDisplay = function  ( selector, toggleClass, content ) {
        var $target = $(selector);
        if ( $target.hasClass(toggleClass) ) {
            // 显示之前，更换文本内容
            if ( content != '' ) {
                $target.find('.panel-body').html(content);
            }
            $target.removeClass(toggleClass);
        } else {
            $target.addClass(toggleClass);
            // 隐藏之后，清空文本内容
            $target.find('.panel-body').html('');
        }
    };
    
    /**
     * 前端系统相关的一些配置参数
     * @author zoukai 2016/5/10
     * @attr url {Object} 包含后端请求接口的url
     */
    tools.config = {
        url: {
            delete: './manage/deleteItem',    // 删除
            add: 'addItem',    // 添加
            deleteAll: './manage/deleteAllItems',  // 产出所有
            find: ''   // 查找
        }
    };

    return tools;
})();
