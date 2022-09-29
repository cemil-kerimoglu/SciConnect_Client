const [author, setAuthor] = useState("");

    const handleChangeAuthor = (e) => {  
        setAuthor(e.target.value);
      }
 
    const searchPostAuthor = () => {
      if(author.trim()) {
        dispatch(getPostsByAuthor(author));
        navigate(`/posts/search?searchAuthor=${author || 'none'}`);
      } else {
        navigate('/');
      }
    }
  
    const handleKeyPressAuthor = (e) => {
      if(e.key === 'Enter') { 
        searchPostAuthor();
      }
    }

    <TextField 
        name="search" 
        variant="outlined" 
        label="Search for people"
        onKeyPress={handleKeyPressAuthor}
        size='small'
        value={author}
        onChange={handleChangeAuthor} 
    />