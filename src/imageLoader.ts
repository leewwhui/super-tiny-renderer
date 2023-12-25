interface imageLoaderProps {
  key: string;
  src: string;
}

type imageLoaderResult = { string: HTMLImageElement };

export const imageLoader = (
  props: imageLoaderProps[]
): Promise<imageLoaderResult> => {
  const loader = (val: imageLoaderProps) => {
    const { key, src } = val;
    return new Promise((res, rej) => {
      const image = new Image();
      image.src = src;
      image.onload = (e: Event) => {
        res({ key, image: e.target as HTMLImageElement });
      };
    });
  };

  return new Promise((res, rej) => {
    Promise.all(props.map(loader)).then((val) => {
      // @ts-ignore
      const result: imageLoaderResult = {};

      val.forEach((v) => {
        // @ts-ignore
        result[v.key] = v.image;
      });

      res(result);
    });
  });
};
