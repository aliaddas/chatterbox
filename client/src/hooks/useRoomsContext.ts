import { useContext } from 'react';
import RoomsContext, { RoomsContextType } from '../context/RoomsContext';

export default function useRoomsContext(): RoomsContextType {
  const ctx = useContext(RoomsContext); // use the context

  return ctx
}