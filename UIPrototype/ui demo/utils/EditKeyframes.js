/**
 * 修改名为keyframesName的keyframes样式
 *
 * @param {String} keyframesName keyframes名称
 *
 * @returns {Function} 柯里化后的最终处理方法函数
 *
 * @example
 * const edit = _editKeyframes(KEYFRAMESNAME)
 * edit('from {...} to {...}')
 *
 * 注* 如果在dom的className没有改变的情况下直接修改keyframes样式将无法实现动效
 *     所以修改流程为: 去除dom的className -> 修改keyframes -> 重新给dom设置className
 */
export const _editKeyframes = (keyframesName) => {
    let sheetObj = null
    let ss = Array.from(document.styleSheets).filter(styleSheet => {
        return !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
    })
    if (!!ss.length) {
        for (let i = 0; i < ss.length; ++i) {
            for (let j = 0; j < ss[i].cssRules.length; ++j) {
                if (ss[i].cssRules[j].type === window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name === keyframesName) {
                    sheetObj = {
                        has: true,
                        value: ss[i],
                    }
                    break
                }
            }
            if (sheetObj === null) {
                sheetObj = {
                    has: false,
                    value: ss[0],
                }
            }
        }
    } else {
        document.head.appendChild(document.createElement('style'))
        ss = Array.from(document.styleSheets).filter(styleSheet => {
            return !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
        })
        sheetObj = {
            has: false,
            value: ss[0],
        }
    }

    return function (cssStr) {
        if (sheetObj.has) {
            const index = [...sheetObj.value.cssRules].findIndex(val => {
                return val.name === keyframesName
            })
            sheetObj.value.deleteRule(index)
            sheetObj.value.insertRule(`@keyframes ${keyframesName} ${cssStr}`)
        } else {
            sheetObj.value.insertRule(`@keyframes ${keyframesName} ${cssStr}`)
            sheetObj.has = true
        }
    }
}