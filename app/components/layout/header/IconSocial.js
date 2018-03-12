import React from 'react'

const icons = [
  {
    url: 'https://www.facebook.com/scasia.org',
    style: 'textHover fa fa-facebook-square'
  },
  {
    url: 'https://www.linkedin.com/groups/48661/profile',
    style: 'textHover fa fa-linkedin-square'
  },
  {
    url: 'https://www.youtube.com/channel/UCmG1K412h4FOw9TN8JUGDfQ',
    style: 'textHover fa fa-youtube-play'
  }
]

const renderIcon = (key, link) => {
  const { url, style } = link
  return (
    <a target='_blank' href={url} key={key}>
      <i style={styles.logo} className={style}></i>
    </a>
  )
}

const IconSocial = (props) => {
  const { alignLeft } = props

  let iconsHTML = []
  for (var i = 0; i < icons.length; i++) {
    const icon = icons[i]
    iconsHTML.push(renderIcon(i, icon))
  }

  if (alignLeft) {
    return (
      <div style={styles.logoWrapperLeft}>
        {iconsHTML}
      </div>
    )
  } else {
    return (
      <div style={styles.logoWrapperRight} className='hidden-xs'>
        {iconsHTML}
      </div>
    )
  }
}

const styles = {
  logoWrapperLeft: {
    paddingTop: 5,
    textAlign: 'left'
  },
  logoWrapperRight: {
    paddingTop: 5,
    textAlign: 'right'
  },
  logo: {
    padding: 5,
    color: 'white',
    fontSize: 28
  }
}

export default IconSocial
