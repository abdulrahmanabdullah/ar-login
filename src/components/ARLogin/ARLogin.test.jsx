import React from "react"
import {render} from "@testing-library/react"

import ARLogin from "./ARLogin"

describe("ARLogin",()=>{
    test("render the login component",()=>{
        render(<ARLogin />)
    })
})