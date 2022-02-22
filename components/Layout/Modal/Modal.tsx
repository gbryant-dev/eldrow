import React, { FC, useCallback, useEffect, useState } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import { CloseIcon, MotionContainer } from './Modal.style'
import { AnimatePresence } from 'framer-motion';

interface Props {
  show?: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, onClose, show }) => {
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
  }, [])

  useEffect(() => {
    if (closing && onClose) onClose()
  }, [closing, onClose])

  return (

    <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
      {show && (
        <Backdrop onClick={handleClose}>
          <MotionContainer
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: '-100vh' }}
            animate={{ opacity: 1, y: '0' }}
            exit={{ opacity: 0, y: '100vh' }}
          >
            <CloseIcon onClick={handleClose}>X</CloseIcon>
            {children}
          </MotionContainer>
        </Backdrop>
      )}
    </AnimatePresence>

  )
}

export default Modal