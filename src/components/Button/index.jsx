import P from 'prop-types'

export const Button = ({ children, onButtonClick }) => {

  return (
    <button style={{ fontSize: '30px' }} onClick={onButtonClick} >{children}</button>
  )
}
Button.propTypes = {
  children: P.string.isRequired,
  onButtonClick: P.func.isRequired
}
