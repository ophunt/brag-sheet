import './NameSetter.scss';

function NameSetter({ name, setName }) {
  return (
    <div className='NameSetter'>
      <label>Name: </label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export default NameSetter;
