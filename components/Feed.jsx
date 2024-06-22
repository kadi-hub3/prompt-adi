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
  const [prompts, setPrompts] = useState([]);


  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

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
                onChange={handleSearchChange}
                className='search_input peer'
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