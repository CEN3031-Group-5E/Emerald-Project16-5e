import "./ProgressBar.less";

const Progress = ({
  progress
}) => {
  return (
    <div className={"progress-bar-background"}>
      <div className={"progress-bar"} style={{
        right: `${100 - progress}%`
      }}>{`${progress}%`}</div>
    </div>
  )
}

export default Progress
