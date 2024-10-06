import CustomerList from "../CustomerList";
import { render, screen, waitFor,  cleanup, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe("OutputTable function test", () => {
    //Arrange

    let mockData = 
    [    
        {"id":1,"name":"Dan Cockerill","email":"bcockerill0@reddit.com","password":"gI9$+#'oEg>#u"},
        {"id":2,"name":"James Cockerill","email":"James@reddit.com","password":"james"}
    ]

    let mode = 'Update';
    let rerender;

    let mockProps;

    beforeEach(() => 
    {
        mockProps = {
            data: mockData,
            formObject: { id: 1 },
            mode: mode,
            onSelect: jest.fn(),
        };

        const renderResult = render(<CustomerList {...mockProps} />);
        rerender = renderResult.rerender;
    });

    it("should render the table rows correctly", () => 
    {
        //Act
        const rows = screen.getAllByRole('row');

        //Assert
        //add one to mockdata length to account for table headers
        expect(rows).toHaveLength(mockData.length+1);
    });


    it("should apply the selected class to the correct row", async () =>
    {
        //Arrange
        const user = userEvent.setup();
        
        //console.log(<CustomerList {...mockProps} />);
        const rows = screen.getAllByRole('row');
        const firstDataRow = rows[1];
        const secondDataRow = rows[2];
        
        console.log("1st:",firstDataRow.className);
        console.log("2nd:",secondDataRow.className);

        expect(screen.getByText('Dan Cockerill').closest('tr')).toHaveClass('selected');

        await act(async () => {
            await user.click(screen.getByText('James Cockerill'));
            mockProps.formObject = { id: 2 };
            rerender(<CustomerList {...mockProps} />);
        });

        console.log("1st after click:",firstDataRow.className);
        console.log("2nd after click:",secondDataRow.className);

        await waitFor(() => 
        {
            expect(screen.getByText('James Cockerill').closest('tr')).toHaveClass('selected');    
        });
    });

    afterEach(() => 
    {
        cleanup();
    })
});