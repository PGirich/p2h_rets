import classes from './v_progress.module.css'

export default function VProgress(props: {
  children: string
  value: number
  max: number
  color: string
}) {
  return (
    <div className={classes.VProgress}>
      <span>{props.children}</span>
      <span style={{ clipPath: "rect(0 "+props.value/props.max*200+"px 40px 0)", backgroundColor: props.color }}>{props.children}</span>
    </div>
  )
}
