<%@ page language="java" import="java.util.*,java.awt.Robot" pageEncoding="UTF-8"%>
<%
	
	//1、写一段Javascript代码的字符串形式；
	String jsStr="alert('您好，JS');";
	jsStr+="alert('您好，我来自jsp，但是在前端执行');";
	jsStr+="function t(){alert('函数')}";
	
	jsStr+="t();";
	
	//2、把avascript代码的字符串形式发送给前端，由前端执行
	out.print(jsStr);
	
%>

