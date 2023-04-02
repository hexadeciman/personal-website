import { ReactComponent as Linkedin } from './icons/linkedin.svg'
import { ReactComponent as Github } from './icons/github.svg'
import { ReactComponent as Email } from './icons/email.svg'

export const Outbounds = () => {
  return (
    <div id="outbounds">
      <a
        href="https://www.linkedin.com/in/yassinben/"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin />
      </a>
      <a
        className="-mt-1"
        href="https://github.com/hexadeciman"
        target="_blank"
        rel="noreferrer"
      >
        <Github />
      </a>
      <a href="mailto:me@yassin.ch" target="_blank" rel="noreferrer">
        <Email />
      </a>
    </div>
  )
}
