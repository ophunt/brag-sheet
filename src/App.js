import './App.scss';

import { useState } from "react";
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";

import NameSetter from "./components/NameSetter"
import ExpandableList from './components/ExpandableList';
import { Form } from 'react-bootstrap';

// Let us use Maps and Sets with Immer (nice for project-competency relation)
enableMapSet();

let nextCompetencyId = 3;
let nextProjectId = 2;
const defaultData = {
  name: "New User",
  competencies: [
    { id: 0, name: "Problem Solving" },
    { id: 1, name: "Communication" },
    { id: 2, name: "Lives the Values" },
  ],
  projects: [
    { id: 0, name: "Project 1", },
    { id: 1, name: "Project 2", },
  ]
}

function App() {
  const [name, setName] = useState(defaultData.name);
  const [competencies, updateCompetencies] = useImmer(defaultData.competencies);
  const [projects, updateProjects] = useImmer(defaultData.projects);
  const [projHasCompMap, updateProjHasCompMap] = useImmer(new Map());

  const setCompetency = (id, name) => {
    updateCompetencies(draft => {
      const competency = draft.find(a => a.id === id);
      competency.name = name;
    });
  }

  const addCompetency = () => {
    updateCompetencies(draft => {
      draft.push({
        id: nextCompetencyId++,
        name: "New Competency"
      })
    });
  }

  const removeCompetency = (index) => {
    updateCompetencies(draft => {
      draft.splice(index, 1);
    });
  }

  const setProjectName = (id, name) => {
    updateProjects(draft => {
      const proj = draft.find(a => a.id === id);
      proj.name = name;
    });
  }

  const addProject = () => {
    updateProjects(draft => {
      draft.push({
        id: nextProjectId++,
        name: "New Project"
      });
    });
  }

  const removeProject = (index) => {
    updateProjects(draft => {
      draft.splice(index, 1);
    });
  }

  const setProjectCompetency = (projId, compId, val) => {
    console.log({ projId, compId, val })
    updateProjHasCompMap(draft => {
      if (!draft.has(projId)) {
        draft.set(projId, new Map());
      }
      draft.get(projId).set(compId, val);
    });
  }

  console.log({ projects })
  return (
    <div className="App">
      <h1>Brag Sheet Maker</h1>

      <div>
        <p>Hello <b>{name}</b>! Update your name below to begin, or open the tray on the left and import your existing data.</p>
        <NameSetter name={name} setName={setName} />
      </div>

      <hr />

      <div>
        <h4>Define Competencies</h4>
        <p>
          For each project that will end up on this sheet, you'll enter a name, a description, and select which <b>competencies</b> it has demonstrated. Let's make a list of those competencies now.
        </p>
        <ExpandableList
          itemCategoryName='Competency'
          list={competencies}
          setItem={setCompetency}
          addItem={addCompetency}
          removeItem={removeCompetency}
        />
      </div>

      <hr />

      <div>
        <h4>List your Projects</h4>
        <p>Now here is a list of projects you've worked on. Add to the list!</p>
        <ExpandableList
          itemCategoryName='Project'
          list={projects}
          setItem={setProjectName}
          addItem={addProject}
          removeItem={removeProject}
        />
      </div>

      <hr />

      <div>
        <h4>Assign Competencies to Projects</h4>
        <p>For each of those projects, select which competencies you demonstrated. You'll have a chance to provide details for all of these later.</p>
        <table>
          <tbody>
            <tr>
              <th>Competencies</th>
              {competencies.map(c => (
                <th key={c.id}>{c.name}</th>
              ))}
            </tr>
            {projects.map(p => (
              <tr key={p.id}>
                <th>{p.name}</th>
                {competencies.map(c => (
                  <td key={c.id}>
                    <Form.Check
                      type='checkbox'
                      id={p.id + ":" + c.id}
                      checked={projHasCompMap.get(p.id)?.get(c.id)}
                      onChange={(e) => setProjectCompetency(p.id, c.id, e.target.checked)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
