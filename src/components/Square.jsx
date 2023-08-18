// Dibuja los cuadrados del tablero
// eslint-disable-next-line react/prop-types
export const Square = ({ children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleCLick = () => {
      updateBoard(index) //el index nos dira en que Square se dio click
    }
  
    return (
      <div onClick={handleCLick} className={className}>
        {children}
      </div>
    )
  }