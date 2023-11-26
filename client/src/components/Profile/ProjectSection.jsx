import "./ProjectSection.less";

const ProjectSection = () => {
  return (
    <div className={"profile-project-display profile-page-section"}>
      <h2>Projects</h2>
      {Array(5).fill("1").map((name, index) => (
        <div
          key={index}
          className="profile-project-display-project profile-page-item-border profile-page-round"
        >
          Project {name} (Content of this will depend on what the Gallery team creates)
        </div>
      ))
      }
    </div>
  )
}

export default ProjectSection;
