import React, { useState } from 'react';

export default function Calculator()
{
    const[expression,setExpression]= useState("");

     function handle(e)
     {
         console.log(e.target.innerText);
         setExpression(expression+e.target.innerText);
     }
       
     function precedence(x)
     {
        if(x=='+'||x=='-')
          return 1;
        if(x=='*'||x=='/')
          return 2;
         return 3;   
        }

     function calculate()
     {
        var i=0,exp="",arr=[],stk=[];  

        console.log(expression);
        while(i<expression.length)
        {
            if(i==0||(expression[i]!='+'&&expression[i]!='-'&&expression[i]!='*'&&expression[i]!='/'))
                 exp+=expression[i];
                 else
                 {
                    arr.push(exp); exp="";
                    while(stk.length>=1&&precedence(stk[stk.length-1])>=precedence(expression[i]))
                        arr.push(stk.pop());

                    stk.push(expression[i]);
                 }
                 i++;
        }
          arr.push(exp);
        while(stk.length>0)
        {
          arr.push(stk[stk.length-1]);
            stk.pop();
        }

        console.log(arr);

         i=0; var total=0;
      while(i<arr.length)
     {
        if(arr[i]!='+'&&arr[i]!='*'&&arr[i]!='-'&&arr[i]!='/')
                   stk.push(arr[i]);
             else
             {
                 let op=arr[i];
                 let op1= parseFloat(stk.pop());
                 let op2= parseFloat(stk.pop());

                 if(op=='/')
                      stk.push(op2/op1);
                  else if(op=='+')
                      stk.push(op1+op2);
                   else if(op=='-')
                     stk.push(op2-op1);
                   else 
                     stk.push(op1*op2);     
             }
             i++;  
     }
               console.log(stk[0]);
               setExpression(stk[0]);
     }
     function Delete()
     {
         if(expression.length>=1)
         setExpression(expression.slice(0,expression.length-1));
         else
         setExpression("");
     }
         function handle_input(e)
         {
             setExpression(e.target.value);
         }
    return(
         <>
        <input type="text" value={expression} onChange={handle_input}/>
        <table>
       <tr>
           <td><button className="input" onClick={handle}>0</button></td>
            <td><button className="input" onClick={handle}>1</button></td> 
           <td><button className="input" onClick={handle}>2</button>
           </td> <td><button className="input" onClick={handle}>3</button></td>
       </tr>
       <tr>
       <td><button className="input" onClick={handle}>4</button></td> 
       <td><button className="input" onClick={handle}>5</button></td> 
           <td><button className="input" onClick={handle}>6</button></td> 
           <td><button className="input" onClick={handle}>7</button></td>
       </tr> 
       <tr>
       <td><button className="input" onClick={handle}>8</button></td> 
       <td><button className="input" onClick={handle}>9</button></td> 
       <td><button className="op" onClick={handle}>+</button></td>
        <td><button className="op" onClick={handle}>-</button></td> 
       </tr> 
       <tr>
           <td><button className="op" onClick={handle}>*</button></td>
           <td><button className="op" onClick={handle}>/</button></td>
           <td><button className="cal" onClick={calculate}>=</button></td>
           <td><button className="del" onClick={Delete}>del</button></td>
       </tr>
        </table>
       </>
    );
}