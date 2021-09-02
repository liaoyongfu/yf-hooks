const downloadFile = (blobData: any, filename: string) => {
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

export default downloadFile;
