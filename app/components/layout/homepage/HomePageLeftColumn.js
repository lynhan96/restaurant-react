import React from 'react'
import Navigator from 'lib/Navigator'

const links = [
  {
    page: 'p/about',
    image: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon1SCFP.jpg?alt=media&token=46b44b79-c5ef-469e-be61-a1b16a0e949d'
  },
  {
    page: 'p/benefits',
    image: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon2ELIGIBLE.jpg?alt=media&token=b9ddbaab-16c4-46cf-81e7-6cfde090ec30'
  },
  {
    page: 'validation',
    image: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon3JOIN.jpg?alt=media&token=cb55f534-4546-4d49-8a15-1e74df71c961'
  },
  {
    page: 'p/contact',
    image: 'https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Ficon4CONTACT.jpg?alt=media&token=d48494d8-d319-4f31-a357-7b9792800559'
  }
]

const goto = (url) => () => Navigator.push(url)

const renderLink = (key, link) => {
  const { page, image } = link
  return (
    <a href='javascript:' onClick={goto(page)} key={key}>
      <img style={styles.image} src={image} />
    </a>
  )
}

const HomePageLeftColumn = () => {
  let linksHTML = []
  for (var i = 0; i < links.length; i++) {
    const link = links[i]
    linksHTML.push(renderLink(i, link))
  }

  return (
    <div className='col-md-8'>
      <h2 style={styles.title}>
        <div style={styles.titleInner}>
          SCFP AT-A-GLANCE
        </div>
      </h2>
      <p>
        Supply Chain Asia (SCA) seeks to engage and nurture a dynamic community of supply chain and logistics professionals through its Supply Chain Fellowship Programme (SCFP).
        <br/>
        <br/>
        SCFP forms part of our core mission to support supply chain and logistics professionals’ ongoing development and future skills needs.
      </p>
      <p>
        {linksHTML}
      </p>
    </div>
  )
}

const styles = {
  title: {
    height: 37,
    borderBottom: '3px solid #000000'
  },
  titleInner: {
    width: 50,
    height: 37,
    whiteSpace: 'nowrap',
    borderBottom: '3px solid #f5a300'
  },
  image: {
    width: '50%',
    padding: 10
  }
}

export default HomePageLeftColumn
