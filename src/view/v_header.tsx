import classes from './v_header.module.css'

export default function VHeader() {
  return (
    <header className={classes.VHeader}>
      <img id="img.dragon" className={classes.VHeaderImg} src={'./img.dragon.png'}  width="50px" />
      <div className={classes.VHeaderSpan}>Path to<br></br>Heaven<h5>ver.0.1</h5></div>
    </header>
  )
}
