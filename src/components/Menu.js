import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react';
import { React, useContext } from 'react';
import { FcFeedback } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../state/AuthProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import { supabase } from '../utils/supabaseClient';


export default function AccountMenu() {
    const { user } = useContext(AuthContext)
    const { setDefaultContent } = useContext(EditorContentContext)
    const toast = useToast()

    const logout = async () => {
        supabase.auth.signOut()

        setDefaultContent()

        toast({
            title: "Signed out successfully.",
            isCloseable: true,
            status: 'success',
            position: 'top-right'
        })
    }

    const sendFeedback = () => {
        toast({
            description: "not supported yet"
        })
    }

    return user ? (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
            />
            <MenuList padding={"2"}>
                <MenuItem icon={<FcFeedback />} onClick={sendFeedback}>
                    <Text> Send feedback </Text>
                </MenuItem>
                <MenuItem icon={<FiLogOut />} onClick={logout}>
                    <Text> Log out {user.email} </Text>
                </MenuItem>
            </MenuList>
        </Menu>
    ) : null
}