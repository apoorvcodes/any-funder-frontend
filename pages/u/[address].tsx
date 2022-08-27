import { useRouter } from 'next/router'

export const UserSettingsPage = () => {
    const router = useRouter();
    const { address } = router.query;
    
    return (
        <div>
            User: {address}
        </div>
    );  
};
