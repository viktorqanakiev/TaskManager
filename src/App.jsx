import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectsId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectsId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectsId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        //spreding all the previous info about the object
        ...prevState,
        //updateing the new info
        selectedProjectsId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectsId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectsId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectsId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectsId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectsId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );
  if (projectState.selectedProjectsId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectsId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectState.projects}
          onSelectProject={handleSelectProject}
        />
        {content}
      </main>
    </>
  );
}

export default App;
