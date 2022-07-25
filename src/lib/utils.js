// 时间格式化函数
export function dateFormat(date, format) {
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    date = parseInt(date);
  }

  date = new Date(date);
  if (date.toString() === 'Invalid Date') {
    throw 'Error, parameter date is not valid: Invalid Date.';
  }

  var map = {
    "M": date.getMonth() + 1, // 月
    "d": date.getDate(), // 日
    "h": date.getHours(), // 时
    "m": date.getMinutes(), // 分
    "s": date.getSeconds(), // 秒
    "q": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds(), // 毫秒
  };

  format = format.replace(
    /([yMdhmsqS])+/g,
    function (match, p, offset, string) {
      var v = map[p];
      if (v !== undefined) {
        // 月/日/时/分/秒 的格式为 xx 时始终返回两位数，若只有一位，用 0 在前面补位
        if (match.length > 1 && p !== 'S') {
          v = '0' + v;
          v = v.substring(v.length - 2);
        }
        return v;
      } else if (p === 'y') {
        // 处理 年
        // 传入年的格式为 yy 返回年份末尾两位
        if (match.length === 2) {
          return (date.getFullYear() + '').substring(2);
        } else {
          // yyyy/yyy/y 返回完整的年
          return (date.getFullYear() + '');
        }
      }
    });
  return format;
}
