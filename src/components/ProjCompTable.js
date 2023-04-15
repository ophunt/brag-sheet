
import { Form } from 'react-bootstrap';

export default function ProjCompTable({ projects, competencies, projHasCompMap, setProjectCompetency }) {
  return (
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
  )
}
