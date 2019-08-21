export default (Vue) => {
    /* from面板拖动指令
     *
     * */
    Vue.directive("win_dialogDrag", {
            inserted(el) {
                const dialogHeaderEl = el.querySelector(".el-dialog__header");
                const dragDom = el.querySelector(".el-dialog");
                const dragDomParent = el.querySelector(".el-dialog").parentNode
                dragDomParent.style.display = "block"
                dialogHeaderEl.style.cursor = "move"
                dragDom.style.marginTop = "0px"
                dragDom.style.left = "50%"
                dragDom.style.top = "80px"
                let marginLeft = -parseInt(dragDom.style.width) / 2
                dragDom.style.marginLeft = marginLeft + "px"
                dragDom.style.marginTop = "0px"
                dragDom.style.marginBottom = "0px"
                const sty =
                    dragDom.currentStyle || window.getComputedStyle(dragDom, null);
                dialogHeaderEl.onmousedown = e => {
                    // 鼠标按下，计算当前元素距离可视区的距离
                    const disX = e.clientX - dialogHeaderEl.offsetLeft;
                    const disY = e.clientY - dialogHeaderEl.offsetTop;

                    // 获取到的值带px 正则匹配替换
                    let styL, styT;
                    if (sty.left.includes("%")) {
                        styL = +document.body.clientWidth *
                            (+sty.left.replace(/\%/g, "") / 100);
                        styT = +document.body.clientHeight *
                            (+sty.top.replace(/\%/g, "") / 100);
                    } else {
                        styL = +sty.left.replace(/\px/g, "");
                        styT = +sty.top.replace(/\px/g, "");
                    }
                    document.onmousemove = function (e) {
                        // 通过事件委托，计算移动的距离
                        const l = e.clientX - disX;
                        const t = e.clientY - disY;
                        const dialoWidth = dragDom.clientWidth;
                        const screeWidth = document.body.clientWidth;
                        const dialoHeight = dragDom.clientHeight;
                        const screeHeight = document.body.clientHeight;

                        // 移动当前元素
                        let left = l + styL;
                        let top = t + styT
                        if (left <= 0 - marginLeft) {
                            left = 0 - marginLeft;
                        }
                        if (left > screeWidth - dialoWidth - marginLeft) {
                            left = screeWidth - dialoWidth - marginLeft
                        }
                        if (top <= 0) {
                            top = 0 + 20
                        }

                        if (top > screeHeight - dialoHeight - 50) {
                            top = screeHeight - dialoHeight - 50
                        }

                        dragDom.style.left = `${left}px`;
                        dragDom.style.top = `${top}px`;
                        //将此时的位置传出去
                        //binding.value({x:e.pageX,y:e.pageY})
                    };

                    document.onmouseup = function (e) {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        }),
        /* from光标定位到那个input框
         *
         * */
        Vue.directive("focus", {
            inserted(el) {

                let input = el.querySelector(".el-input__inner")
                input.focus();
            }
        }),

        Vue.directive("winfocus", {
            inserted(el) {
                el.focus();

            }
        }),
        Vue.directive("testName", {
            bind(el, binding) {
                let elNode = getChildNodes(el)
                elNode.forEach((item, index) => {
                    if (item.localName == "input") {
                        item.setAttribute("test_name", `${binding.value.TEST_NAME}-${index}`);
                        console.log(item)
                    }
                    if (item.localName == "textarea") {
                        item.setAttribute("test_name", `${binding.value.TEST_NAME}-${index}`);
                    }
                })
            }
        })
}




function getChildNodes(node) {
    var nodes = node.childNodes;
    var arr = [];
    for (var i = 0; i < nodes.length; i++) {
        var childNode = nodes[i];
        if (childNode.nodeType == 1) {
            arr.push(childNode);
            var temp = getChildNodes(childNode); //递归调用getChildNodes方法，查看当前子节点下是否还有子节点
            arr = arr.concat(temp); //将递归获取的子节点数组与之前的数组拼接成一个数组
        }
    }
    return arr;



}
