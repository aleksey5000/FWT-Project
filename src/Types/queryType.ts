import React from 'react'

type queryObj = {name_like: string, authorId: number, locationId: number, created_gte: number, created_lte: number}
type queryType = {context:queryObj, setContext: React.Dispatch<React.SetStateAction<queryObj>>}

export type {queryType, queryObj}