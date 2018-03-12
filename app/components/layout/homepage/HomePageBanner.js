import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const settings = {
  showArrows: false,
  showStatus: false,
  showThumbs: false,
  autoPlay: true,
  interval: 3000
}

const HomePageBanner = () => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <Carousel {...settings}>
          <img style={styles.banner} src='https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Fhomepage1.jpg?alt=media&token=1eb15fea-b6c0-46e7-b9d6-80c487627e5e' />
          <img style={styles.banner} src='https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Fhomepage2.jpg?alt=media&token=30e60ab9-1f72-425e-8b65-a0b4ab7f0d3c' />
          <img style={styles.banner} src='https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Fhomepage3.jpg?alt=media&token=423b6d9d-ba9a-4d61-8e70-a8a1d1577d5b' />
        </Carousel>
      </div>
    </div>
  )
}

const styles = {
  banner: {
    width: '100%'
  }
}

export default HomePageBanner
