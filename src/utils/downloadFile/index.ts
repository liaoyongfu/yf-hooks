import { useState } from 'react';
import { stringify } from 'qs';

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
    .replace(/"/g, '')
    .replace(/;/g, '');
  // 文件名解码
  _fileName = _fileName
    ? decodeURI(decodeURIComponent(_fileName))
    : defaultFileName;

  downloadFile(_blob, _fileName);
};

export const useExport = (url: string, reqData: Record<any, any>) => {
  const [loading, setLoading] = useState(false);
  // 处理导出
  const handleExport = async () => {
    try {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: stringify(reqData),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            responseType: 'blob',
          },
        });

        await downLoadBlobFile(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return { loading, handleExport };
};
