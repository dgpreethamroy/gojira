import React from 'react'
import Modal from './Modal'

const Button = () => {
    
    const handleDropdownChange = (selectedOption) => {
        console.log('Selected option:', selectedOption);
        // Do something with the selected option
      };
    
const inputArray =['Project Name','Project Details','Project Key']
const DropdownObj = [
    {
      label: 'Dropdown 1',
      options: ['Option 1', 'Option 2', 'Option 3'],
      onChange: handleDropdownChange,
    },
    {
      label: 'Dropdown 2',
      options: ['Option A', 'Option B', 'Option C'],
      onChange: handleDropdownChange,
    },
  ];
  

const [toggleModal, setToggleModal] = React.useState(false)
  return (
    <div>
        <button onClick={()=>setToggleModal(true)} >
            Add Project
        </button>
        {toggleModal && <Modal inputArray={inputArray} setToggleModal={setToggleModal} toggleModal={toggleModal} 
            DropdownObj={DropdownObj}
            modalType='formModal'
            modalTitle='Create Project'
        
        />}
    </div>
  )
}

export default Button