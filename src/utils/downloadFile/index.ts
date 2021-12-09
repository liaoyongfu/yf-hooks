export const downloadFile = (blobData: any, filename: string) => {
  const url = window.URL.createObjectURL(blobData);
  // 通过创建a标签实现
  const link = document.createElement('a');

  link.href = url;
  if (filename) {
    link.download = filename;
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downLoadBlobFile = async (
  res: any,
  defaultFileName = '未命名',
) => {
  // 拿到后端返回的文件名称
  let _fileName = res.headers.get('content-disposition');
  // 获取到二进制
  const _blob = await res.blob();

  // 匹配出文件名
  _fileName = _fileName
    .replace(/(.*)(filename=){1}(.+)$/g, '$3')
    .replace(/^"/, '')
    .replace(/"$/, '');
  // 文件名解码
  _fileName = _fileName
    ? decodeURI(decodeURIComponent(_fileName))
    : defaultFileName;

  downloadFile(_blob, _fileName);
};
