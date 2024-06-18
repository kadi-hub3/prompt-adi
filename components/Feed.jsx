'use client'
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt)=> (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [ searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);
  const handleSearchTextChange = async (e) => {

  }

  useEffect(()=>{
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPrompts(data);
    }

    fetchPrompts();
  }, [])
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' 
                placeholder='Search for a tag or username'
                value={searchText}
                onChange={handleSearchTextChange}
                required
        />
      </form>
      <PromptCardList
        data={prompts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed