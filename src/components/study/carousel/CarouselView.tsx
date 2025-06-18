import Carousel from '@components/common/carousel';

export default function CarouselView() {
  return (
    <>
      <Carousel items={['/assets/test.jpg', '/assets/test2.jpg', '/assets/test3.jpg']} />
    </>
  );
}
