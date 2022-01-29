import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import Image from 'next/image'
import arkettLogo from '../../public/arkett_logo_small.png'

export default function Logo() {
    return (
        <LinkBox
            height='2em'
            width='8em'
            opacity={'90%'}
        >
            <LinkOverlay href='/'>
                <Image
                    src={arkettLogo}
                    alt={"arkett"}
                    layout='fill'
                    objectFit='contain'
                />
            </LinkOverlay>
        </LinkBox>
    )
}
