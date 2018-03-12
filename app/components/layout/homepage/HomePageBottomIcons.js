import React from 'react'

const iconData = [
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon5BeRecognised.jpg?alt=media&token=4a2dfb60-ee41-4907-9d4f-d28b9c2959f7',
    title: 'Be Recognised',
    intro: 'for your years of service & contributions to the supply chain & logistics industry'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon6club.jpg?alt=media&token=f030f835-8daf-4fb2-9124-c371c8946c8a',
    title: 'Join an exclusive club',
    intro: 'of your peers and expand your networking opportunities'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon7leader.jpg?alt=media&token=a390b809-cc72-48b9-8e73-feadd7ef55ee',
    title: 'Step up as an thought leader',
    intro: 'and push the industry forward with your expertise and experience'
  }
]

const renderIconHTML = (index, icon) => {
  const { url, title, intro } = icon
  return (
    <div style={styles.item} key={index} className='col-md-4'>
      <img style={styles.image} src={url} />
      <br/>
      <b style={styles.title}>{title}</b>
      <br/>
      {intro}
    </div>
  )
}

const HomePageBottomIcons = () => {
  let iconsHTML = []
  for (var i = 0; i < iconData.length; i++) {
    const icon = iconData[i]
    iconsHTML.push(renderIconHTML(i, icon))
  }

  return (
    <div className='row' style={styles.wrapper}>
      {iconsHTML}
    </div>
  )
}

const styles = {
  wrapper: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: '2px solid #000000'
  },
  item: {
    padding: 15,
    textAlign: 'center',
    fontSize: 15
  },
  title: {
    color: '#f36f21',
    fontSize: 25
  },
  image: {
    width: '50%'
  }
}

export default HomePageBottomIcons
