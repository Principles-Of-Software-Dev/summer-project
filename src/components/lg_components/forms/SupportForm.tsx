import React from 'react'
import Button from '../../sm_components/Button'
import DescriptionField from '../../sm_components/validator_fields/DescriptionField'
import EmailField from '../../sm_components/validator_fields/EmailField'
import NameField from '../../sm_components/validator_fields/NameField'
import TitleField from '../../sm_components/validator_fields/TitleField'

const SupportForm = () => {
    const handleSubmit = () => {
        // Implement later
  
    }

  return (
      <div className='flex items-center justify-center w-full h-full'>
          {/* Start actual code. */}
          <div className='grid grid-cols-2 grid-rows-6 w-[] h-main bg-zinc-200'>
              <p className='flex items-center justify-center row-span-1 col-span-2'>
                  Send Help Request
              </p>

              <div className='lg:hidden flex items-center justify-center row-span-1 '>
                  <NameField size={15}/>
              </div>
              <div className='lg:flex hidden items-center justify-center row-span-1 '>
                  <NameField size={22}/>
              </div>

              <div className='lg:hidden flex items-center justify-center row-span-1'>
                  <EmailField size={15}/>
              </div>
              <div className='lg:flex hidden items-center justify-center row-span-1'>
                  <EmailField size={22}/>
              </div>

              <div className='flex items-center justify-center row-span-2 col-span-2'>
                  <TitleField title_length={10}/>
              </div>
              <div className='flex items-center justify-center row-span-2 col-span-2'>
                  <DescriptionField description_length={50}/>
              </div>
              <div className='flex items-center justify-end row-span-1 col-span-2 mx-4 my-2'>
                < button onClick={handleSubmit}>
                    <Button
                        height="h-xsmall-button"
                        color='bg-zinc-400'
                        buttonText='Submit'
                        textColor='text-c-white'
                        hoverColor='hover:bg-zinc-500'
                    />
                </ button>
                  
              </div>


          
          
          </div>
          {/* End code. */}
      </div>
      
  )
}

export default SupportForm