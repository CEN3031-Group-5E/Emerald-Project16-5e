import "./ProjectSection.less";

const P1TEXT = "AUTHOR: User COMPLETED: 6/2/2015 GITHUB LINK: https://github.com/User/Image-Processing DESCRIPTION: Read TGA files and manipulate these files through multiply, subtract, screen, and overlay functions. These functions will alter the levels of red, green, and blue, and output the desired TGA files as a product from the given pictures."
const P2TEXT = "AUTHOR: User COMPLETED: 1/22/2017 GITHUB LINK: https://github.com/User/AVL-Tree DESCRIPTION: Create a self balancing binary tree search tree that does so while adding, deleting, searching, or printing nodes."
const P3TEXT = "AUTHOR: User COMPLETED: 7/7/2023 GITHUB LINK: https://github.com/User/Page-Rank DESCRIPTION: Simulate a simplified page rank, similar to that of ranks displayed on Google search results. This must be done through an adjacency list using maps, either ordered or unordered."
const P4TEXT = "AUTHOR: User COMPLETED: 11/30/21 GITHUB LINK: https://github.com/User/Tree-Comparision DESCRIPTION: Create and compare the the run and compile times between an AVL Tree and a Red Black Tree."
const P5TEXT = "AUTHOR: User COMPLETED: 1/10/2019 GITHUB LINK: https://github.com/User/Heaps DESCRIPTION: Assuming that all input lists are non-empty and that their elements are in non-decreasing order, and given any array of k linked lists, each linked-list is sorted in ascending order, merge all the linked-lists into one sorted linked-list and return it."

const ProjectSection = () => {
  return (
    <div className={"profile-project-display profile-page-section"}>
      <h2>Projects</h2>
      <div className="profile-project-display-project profile-page-item-border profile-page-round">
        {P1TEXT}
      </div>
      <div className="profile-project-display-project profile-page-item-border profile-page-round">
        {P2TEXT}
      </div>
      <div className="profile-project-display-project profile-page-item-border profile-page-round">
        {P3TEXT}
      </div>
      <div className="profile-project-display-project profile-page-item-border profile-page-round">
        {P4TEXT}
      </div>
      <div className="profile-project-display-project profile-page-item-border profile-page-round">
        {P5TEXT}
      </div>
    </div>
  )
}

export default ProjectSection;
