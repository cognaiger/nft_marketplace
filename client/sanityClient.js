import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "c62zyisa",
    dataset: "production",
    apiVersion: "2022-11-22",
    useCdn: false,
    token: 'skiZhnn9HZ5RrYR2gWFdoGofmBgNr3T1r88kMAecojaonGCNPZht80ARj6axyJ8O1kTZ6VOedDDCyXJsE9Z1xtP7xSaRLlQrTZOuYG7H0FTyjVUxjAqlU8dULWBmFSmhRyleA4A0fgRwEkbj1mV3YWysyQ6jtiSmSIywWCt3QCq78mofCjbB'
})