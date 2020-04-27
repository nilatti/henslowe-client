// import React from 'react'
// import Enzyme, { configure, mount, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16'
//
// import EditableAuthor from '../../Components/Authors/EditableAuthor'
//
// Enzyme.configure({ adapter: new Adapter() })
//
// jest.mock('../request');
// jest.mock('../../Components/Authors/EditableAuthor')
//
// beforeEach(() => {
//   EditableAuthor.mockClear()
// })
//
// describe("EditabeAuthor", () => {
//   let props;
//   let mountedEditableAuthor
//   const editableAuthor = () => {
//     if (!mountedEditableAuthor) {
//       mountedEditableAuthor = mount(
//         <EditableAuthor {...props} />
//       )
//     }
//     return mountedEditableAuthor
//   }
//
//   beforeEach(() => {
//     props = {
//       match: undefined,
//       onDeleteClick: undefined,
//       onFormSubmit: undefined,
//     }
//     mountedEditableAuthor = undefined
//   })
//
//   //tests go here
//   describe('when props are defined', () => {
//     beforeEach(() => {
//       props.onDeleteClick = jest.fn(),
//       props.onFormSubmit = jest.fn(),
//       props.match=1
//     })
//
//     it("always renders a div", () => {
//       const divs = EditableAuthor().find("div");
//       expect(divs.length).toBeGreaterThan(0);
//     });
//
//     it('works with promises', () => {
//       return EditableAuthor.loadAuthorFromServer(1).then(data => expect(data).toEqual('Pam'))
//     })
//
//   })
//
// })

import React from 'react'
import Enzyme, { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import Authors from '../../Components/Authors/Authors'

Enzyme.configure({ adapter: new Adapter() })

describe('Authors', () => {
  describe('componentDidMount', () => {
    it('sets the state componentDidMount', async () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 200,
        json: () => new Promise((resolve, reject) => {
          resolve({
            authors: [
              {
                id: 1,
                first_name: 'Pam',
                last_name: 'Mandigo',
                plays: [
                  {
                    id: 1,
                    title: 'Washed'
                  },
                  {
                    id: 2,
                    title: 'Give Us Good'
                  }
                ]
              },
            ]
          })
        })
      }))

      const renderedComponent = await shallow(<Authors />)
      await renderedComponent.update()
      expect(renderedComponent.state('authors').length).toEqual(1)
    })

    it('sets the state componentDidMount on error', async () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 500,
      }))

      const renderedComponent = await shallow(<Authors />)
      await renderedComponent.update()
      expect(renderedComponent.state('errorStatus')).toEqual('Error fetching authors')
    })
  })
})
