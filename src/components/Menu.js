import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react';
import { React, useContext } from 'react';
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

    return user ? (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
            />
            <MenuList padding={"2"}>
                <MenuItem icon={<FiLogOut />} onClick={logout}>
                    <Text> Log out {user.email} </Text>
                </MenuItem>
            </MenuList>
        </Menu>
    ) : null
}