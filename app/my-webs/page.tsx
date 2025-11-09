"use client";
import apiService from "@/lib/services/apis";
import { Button } from "@chakra-ui/react";

export default function Page() {

    const verifyToken = async () => {
        const response = await apiService.checkToken();
        console.log(response);
    }
    return (
        <div>
            all webs of particilur user show here

            <Button onClick={verifyToken}>verify token</Button>
            


        </div>
    )
}