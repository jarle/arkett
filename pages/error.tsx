import { Container, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps({ query }) {
    const { error } = query;
    return {
        props: {
            error: error || null
        }
    }
}

export default function Error({ error }) {
    const router = useRouter()
    const toast = useToast()
    const toastID = 'error'

    if (error) {
        if (!toast.isActive(toastID)) {
            toast({
                id: toastID,
                title: "Error",
                description: error,
                status: "error",
                position: "top-right",
                isClosable: true
            })
        }
    }

    useEffect(() => {
        router.push("/", null, {
            shallow: true
        })
    }, [])

    return <Container
        height='100vh'
        background={'white'}
        rounded={'lg'}
    >
        Redirecting from error <pre>{error}</pre>
    </Container>
}