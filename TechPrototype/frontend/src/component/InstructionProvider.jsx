import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider";
const InstructionContext = createContext();

const InstructionProvider = ({ children }) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const excute = (instrs) => {
        console.log(instrs)
        for(let i = 0; i < instrs.length; i ++){
            let instr = instrs[i].replace('~', auth.user).split(' ')
            switch (instr[0]) {
                case 'cd':
                    navigate(instr[1])
                    break;
                default:
                    throw Error('Unknown instruction: ' + instr[0]);
                    break;
            }
        }
    }

    return (
        <InstructionContext.Provider value={{ excute }}>
            {children}
        </InstructionContext.Provider>
    );

};

export default InstructionProvider;

export const useInstruction = () => {
    return useContext(InstructionContext);
};